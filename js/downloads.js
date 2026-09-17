/**
 * Downloads Section Logic
 * Simulates a directory listing since browser JS cannot read local directories directly.
 */

document.addEventListener('DOMContentLoaded', () => {
    const downloadsContainer = document.getElementById('downloads-list');
    if (!downloadsContainer) return;
  
    // Fetch manifest file
    fetch('downloads/files.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load files.json');
        }
        return response.json();
      })
      .then(files => {
        renderFiles(files);
      })
      .catch(error => {
        console.error('Error loading downloads:', error);
        downloadsContainer.innerHTML = `
          <div style="text-align: center; color: var(--text-muted); padding: var(--space-2xl);">
            <p>Could not load files. Please make sure downloads/files.json exists.</p>
          </div>
        `;
      });
  
    function renderFiles(files) {
      if (files.length === 0) {
        downloadsContainer.innerHTML = '<p class="text-center text-muted">No files available for download currently.</p>';
        return;
      }
  
      downloadsContainer.innerHTML = '';
      
      files.forEach((file, index) => {
        const delayClass = `delay-${(index % 6) + 1}`;
        const ext = file.name.split('.').pop().toLowerCase();
        let iconSvg = getIconForType(ext);
  
        const itemHtml = `
          <div class="download-item reveal-scale ${delayClass}">
            <div class="download-icon">
              ${iconSvg}
            </div>
            <div class="download-info">
              <h4>${file.name}</h4>
              <p>${file.description || 'Downloadable file'}</p>
            </div>
            <div class="download-size">${file.size || 'Unknown size'}</div>
            <a href="downloads/${file.path}" download="${file.name}" class="btn btn-outline btn-icon" title="Download ${file.name}">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        `;
        downloadsContainer.insertAdjacentHTML('beforeend', itemHtml);
      });
    }
  
    function getIconForType(extension) {
      switch (extension) {
        case 'pdf':
          return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>`;
        case 'zip':
        case 'rar':
          return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>`;
        case 'txt':
        case 'md':
            return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>`;
        case 'jpg':
        case 'png':
        case 'jpeg':
            return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>`;
        default:
          return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>`;
      }
    }
  });
