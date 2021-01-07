# Testing

## Environments

- All browsers in the browserslist (`npx browserslist`)
- All 3 breakpoints for each browser (2000px, 650px, 300px)

## Functionality Tests

These tests are run on every browser once at any window size

### Login

- Sign in through Google and email
- Ensure redirection works with and without the URL parameter

### Dashboard

All Dashboard tests should be run with another dashboard window open to ensure that changes are applied

#### Main

- Ensure that all navbar and sidebar links work
- Make sure font color changes on hover
- Make sure the sign out button works

#### Panes

- Create two slideshows and two embed panes
- Arrange them and ensure the preview updates
- Delete a slideshow
- Put a website (without protocol) in one embed pane
- Put a YouTube url in the other
- For each slideshow:
  - Add some images
  - View the preview on a couple of images and ensure the modal appears
  - Change the order of the images and ensure changes applied
  - Change the duration of the images and ensure changes applied
  - Delete some images

#### Logo table

- Add a logo
- View the preview on the logo and ensure the modal appears
- Delete the logo

#### Settings form

- Change each setting and ensure changes applied
- Input odd values (no value, negative numbers, etc.) and ensure that no errors occur
- Ensure the details element is styled correctly and works (if supported)
- Press refresh slideshow and ensure the slideshow refreshes

#### Account form

- Sign in with an email account
- Ensure all styles appear correct
- Input a bad email and ensure errors are handled correctly
- Input a good email and a bad current password and ensure errors are handled correctly
- Input a good email and password and ensure there are no errors
- Ensure the current password modal appears
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

## Style Tests

These tests are run at every breakpoint on every browser

### 404

- Navigate to `404.html` and make sure all styles are correct

### Login

- Log in with any account
- Make sure all styles are correct

### Dashboard

#### Main

- Ensure all styles appear correct
- Ensure that scrolling the main container does not move the sidebar or navbar
- Generate an error and make sure the error alert is formatted correctly

#### Panes

- Delete all panes
- Ensure that all styles appear correct
- Add some panes
- Ensure that all styles appear correct
- Ensure the embed pane is styled correctly

#### Slides table

- Delete all images
- Ensure that all styles appear correct
- Add some images
- Ensure that all styles appear correct
- View the preview on a couple of images and ensure the modal appears correct
- Ensure the table scrolls if needed

#### Logo table

- Delete all images
- Ensure that all styles appear correct
- Add a logo
- Ensure that all styles appear correct
- View the preview on the logo and ensure the modal appears correct
- Ensure the table scrolls if needed

#### Settings form

- Ensure that all styles appear correct

#### Account form

- Ensure all styles appear correct
- Ensure the current password modal appears correct
