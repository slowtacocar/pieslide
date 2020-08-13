# Testing
## Environments
- All browsers in the browserslist (`npx browserslist`)
- All 3 breakpoints for each browser (2000px, 600px, 300px)
## Tests
Note: JS functionality tests do not have to be run on every breakpoint, but they do have to be run on every browser
### 404
- Navigate to `404.html` and make sure all styles are correct
### Login
- Sign in through Google and email
- Make sure all styles are correct
- Ensure redirection works with and without the URL parameter
### Dashboard
All Dashboard tests should be performed with the slideshow running on another device
#### Main
- Ensure all styles appear correct
- Ensure that scrolling the main container does not move the sidebar or navbar
- Ensure that all navbar and sidebar links work
- Make sure font color changes on hover
- Make sure the sign out button works
- Generate an error and make sure the error alert is formatted correctly
- Make sure the close button on the error works
#### Slides table
- Delete all images
- Ensure that all styles appear correct
- Add some images and ensure the progress modal appears and is styled correctly
- Ensure that all styles appear correct
- View the preview on a couple of images and ensure the modal appears correct
- Change the order of the images and refresh to ensure changes applied
- Change the duration of the images and refresh to ensure changes applied
- Delete some images
- Randomly manipulate the table and ensure changes applied
- Ensure the table scrolls if needed
#### Logo table
- Delete all images
- Ensure that all styles appear correct
- Add a logo and ensure the progress modal appears and is styled correctly
- Ensure that all styles appear correct
- View the preview on the logo and ensure the modal appears correct
- Ensure the table scrolls if needed
#### Settings form
- Ensure that all styles appear correct
- Change each setting and refresh to ensure changes applied
- Input odd values (no value, negative numbers, etc.) and ensure that no errors occur
- Ensure the details element is styled correctly and works (if supported)
- Press refresh slideshow and ensure the slideshow refreshes
#### Account form
- Sign in with an email account
- Ensure all styles appear correct
- Input a bad email and ensure errors are handled correctly
- Input a good email and a bad current password and ensure errors are handled correctly
- Input a good email and password and ensure there are no errors
- Ensure the current password modal appears correct
- Sign out and back in with old credentials (they shouldn't work) and new credentials
- Input a bad password and ensure errors are handled correctly
- Input a good new password and a bad current password and ensure errors are handled correctly
- Input a good new and current password and ensure there are no errors
- Sign out and back in with old credentials (they shouldn't work) and new credentials
- Click delete account and enter a bad password; ensure errors are handled
- Click delete account and enter a good password
- Sign back in (this shouldn't work)
### Slideshow
- Ensure all elements are styled correctly
- Run the Dashboard tests again and ensure that changes take effect and styling is normal (wait in between slides table steps to make sure the slideshow successfully resets and displays the correct order, duration, etc.)
- Before release to production, let the slideshow run on the target device for several days