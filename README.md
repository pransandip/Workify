# Workify Frontend

## Pages that can be found in the project

- Home page

Note: MainApp.js is the one that holds the main app and will render the pages according to the selected tab on the sidebar.

## General info

Internationalization is used within the project, so all copy has to go in the localisation_en.json file, so it can be later translated to other languages.

Enums are encouraged to be used throughout the platform (they can be found within Enums.js)

Auxiliary.js is in place for helper functions, purely to keep the code clean.

The main style for the layout was done using CSS grids. Smaller elements were done using flexboxes.

Fonts were imported from Google Fonts.

SVGs can also be colored using the CSS, color classes have to be defined, see App.scss .filter-night-purple as an example. 
Filter color conversion can be found here: https://codepen.io/sosuke/pen/Pjoqqp

## Styling

Styled components were utilised to create:
- Buttons
- Labels
- Textfields

Note: When using labels, a LabelWrapper class can be used to use multiple styles of CSS within one line. (It is essentially a flexbox) The same applies for Buttons a ButtonWrapper is in place in case an icon has to be added to the button.

### FontStyles 

This file contains all the font styles the app has including size / weight.

### Colors

This file has all the colors that can be used with the React components. Global CSS colors were also set with the same naming convention. 

## Components that were developed

### Popup 

This file has all the popup styles, this will be the structure for all the popups.
All popups will have an associated name that will be added to the POPUP_TYPE Enum. 

### Snackbars

These are either info or warning messages (they were developed with Material-UI)

### Sidebar

The main sidebar of the app when you log in. (What's left is the bit where you can shrink the sidebar so only the icons can be seen)


### Heading

This component can only be found on the login screen and during onboarding.

# 🚨 Outstanding bits on the current implementation:

### Password textfields (need to add an eye to them)
### Onboarding dropdown on the import step (need to align it with the dropdown field itself)
### Adding a link on the checkout page when the 🎉 box comes up (it will have to be the same calendly link as on the previous step)
### Adding a template CSV file to the onboarding step download section
