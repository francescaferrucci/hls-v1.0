# Replace the Existing GitHub Pages Deployment

## Recommended: GitHub Desktop
1. Download and extract the Hannah Learning System 1.0 ZIP.
2. In GitHub Desktop, clone `francescaferrucci/hannah-learning-system`.
3. Delete the old repository files from the local clone **except the hidden `.git` folder**.
4. Copy every extracted HLS 1.0 file and folder into the local clone.
5. Confirm the repository root contains `index.html`, `assets`, `academies`, `.github`, `README.md`, and `.nojekyll`.
6. Commit with the message `Deploy Hannah Learning System 1.0`.
7. Push to `main`.
8. Open GitHub Actions and wait for the green deployment check.
9. Hard-refresh the Pages site with Ctrl+Shift+R on Windows or Command+Shift+R on Mac.

## Web upload alternative
GitHub's browser uploader can flatten folders if files are selected incorrectly. Upload the extracted folder contents while preserving folders. Verify that `assets/app.js` and `academies/foundations/course-1/index.html` exist at those exact paths.

## Access warning
The current Pages site is public. Do not add confidential employee records, restricted policies, credentials, Member information, or protected medical data. Use approved authenticated hosting before production use.
