import './dashboard.js'

const directory = document.querySelector('[data-directory]')

if (directory) {
  const search = directory.querySelector('[data-search]')
  const status = directory.querySelector('[data-status]')
  const rows = [...directory.querySelectorAll('[data-row-status]')]
  const counter = directory.querySelector('[data-result-count]')
  const empty = directory.querySelector('[data-empty]')

  function filterRows() {
    const query = search.value.trim().toLowerCase()
    let matches = 0
    rows.forEach((row) => {
      const matchesQuery = row.textContent.toLowerCase().includes(query)
      const matchesStatus = !status.value || row.dataset.rowStatus === status.value
      row.hidden = !(matchesQuery && matchesStatus)
      if (!row.hidden) matches++
    })
    counter.textContent = `${matches} of ${rows.length} records shown`
    empty.hidden = matches !== 0
  }

  search.addEventListener('input', filterRows)
  status.addEventListener('change', filterRows)
  filterRows()
}

const sampleReports = {
  sales: [
    ['Metric', 'May 2026'],
    ['Total orders', '362'],
    ['Conversion rate', '3.8%'],
  ],
  revenue: [
    ['Week starting', 'USD'],
    ['2026-05-04', '8200'],
    ['2026-05-11', '10400'],
    ['2026-05-18', '12100'],
    ['2026-05-25', '17590'],
    ['Total', '48290'],
  ],
  customers: [
    ['Metric', 'May 2026'],
    ['Active customers', '1284'],
    ['Change vs. April', '+8.2%'],
  ],
  products: [
    ['Product', 'Revenue USD', 'Share of revenue'],
    ['Insight Hub', '23180', '48%'],
    ['Workflow Studio', '15456', '32%'],
    ['Operations Desk', '9654', '20%'],
  ],
}

document.querySelectorAll('[data-export]').forEach((button) => {
  button.addEventListener('click', () => {
    const report = button.dataset.export
    const lines = sampleReports[report].map((row) =>
      row.map((value) => `"${value.replaceAll('"', '""')}"`).join(','),
    )
    const csv = ['"NexaTech Solutions — fictional sample data"', ...lines].join('\r\n') + '\r\n'
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
    const download = document.createElement('a')
    download.href = url
    download.download = `nexatech-sample-${report}-may-2026.csv`
    download.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    document.getElementById('export-feedback').textContent = 'Sample CSV download started.'
  })
})

const form = document.querySelector('[data-workspace-form]')

if (form) {
  const submit = form.querySelector('[type="submit"]')
  const feedback = form.querySelector('[data-form-feedback]')
  const requiredFields = [...form.querySelectorAll('[required]')]
  const workspace = form.querySelector('#workspace-name')

  function validate(field) {
    let message = ''
    if (!field.value.trim()) message = 'Enter a value for this field.'
    else if (field.validity.typeMismatch) message = 'Enter an email address like alex@example.com.'

    const error = document.getElementById(`${field.id}-error`)
    error.textContent = message
    error.hidden = !message
    field.setAttribute('aria-invalid', String(Boolean(message)))
    return !message
  }

  function updateSettings() {
    const compact = form.querySelector('[name="density"]:checked').value === 'compact'
    const report = form.querySelector('#report-view').value
    const notifications = [
      form.querySelector('[name="digest"]').checked ? 'Weekly digest' : '',
      form.querySelector('[name="orders"]').checked ? 'Order updates' : '',
    ].filter(Boolean).join(', ')
    const preview = document.querySelector('[data-preferences]')
    preview.classList.toggle('p-3', compact)
    preview.classList.toggle('p-5', !compact)
    preview.querySelector('[data-settings-preview]').textContent = [
      workspace.value.trim(),
      compact ? 'Compact spacing' : 'Comfortable spacing',
      `${report} reports`,
      notifications || 'Notifications off',
    ].join(' · ')
  }

  function updateProfile() {
    const name = form.querySelector('#display-name').value.trim()
    const email = form.querySelector('#profile-email').value.trim()
    const biography = form.querySelector('#biography').value.trim()
    document.querySelector('[data-profile-name]').textContent = name
    document.querySelector('[data-profile-initials]').textContent = name.split(/\s+/)
      .slice(0, 2).map((word) => Array.from(word)[0]).join('').toUpperCase()
    document.querySelector('[data-profile-summary]').textContent = `${workspace.value.trim()} · ${email}`
    document.querySelector('[data-profile-bio]').textContent = biography
  }

  form.addEventListener('input', (event) => {
    submit.disabled = false
    feedback.textContent = ''
    if (event.target.hasAttribute('aria-invalid')) validate(event.target)
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const invalid = requiredFields.filter((field) => !validate(field))
    if (invalid.length) {
      invalid[0].focus()
      return
    }

    if (form.dataset.workspaceForm === 'settings') updateSettings()
    else updateProfile()
    feedback.textContent = 'Saved in this page for the demo.'
    submit.disabled = true
  })

  submit.disabled = false
}
