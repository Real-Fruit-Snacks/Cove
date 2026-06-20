document.addEventListener('DOMContentLoaded', () => {
    
    // Copy to clipboard functionality
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const textToCopy = copyBtn.getAttribute('data-clipboard');
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = copyBtn.innerText;
                copyBtn.innerText = 'COPIED';
                copyBtn.style.color = 'var(--bg)';
                copyBtn.style.backgroundColor = 'var(--text)';
                copyBtn.style.borderColor = 'var(--text)';
                
                setTimeout(() => {
                    copyBtn.innerText = originalText;
                    copyBtn.style.color = '';
                    copyBtn.style.backgroundColor = '';
                    copyBtn.style.borderColor = '';
                }, 2000);
            });
        });
    }
});
