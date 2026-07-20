"""Convert CV PDF pages to PNG images for lightbox display."""
import fitz  # PyMuPDF
import os

pdf_path = 'public/assets/CV/Atendido_CV.pdf'
output_dir = 'public/assets/CV/'

# Open PDF
doc = fitz.open(pdf_path)

# Save each page as PNG at 200 DPI for good quality
for i in range(len(doc)):
    page = doc[i]
    # Render page to pixmap at 200 DPI
    pix = page.get_pixmap(dpi=200)
    page_path = os.path.join(output_dir, f'Atendido_CV_page_{i+1}.png')
    pix.save(page_path)
    print(f'Saved {page_path}')

doc.close()
print('Done!')
