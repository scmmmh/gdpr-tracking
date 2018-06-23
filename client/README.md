# GDPR Tracking Client

A GDPR-compliant tracking client, intended primarily for research projects
as it currently only supports tracking vs no-tracking. Use together with the
GDPR Tracking Server for an integrated solution.

## Loading

Include the `index.js` into your JavaScript build process.

## Configuration

The information about what information is tracked, what use it is put to, and
the main tracking on/off switch **must** all be placed inside a HTML element
with the attribute `data-gdpr-tracking`. The value of the attribute is sent to
the server as an application identifier. The `data-gdpr-tracking-url` is the
URL of the server to send the data to. The input element to handle the switch
has to have the `data-gdpr-tracking-switch` attribute, and can either be a
checkbox or an input element that allows a choice of values `"true"` or `"false"`.

```html
<div data-gdpr-tracking="your-tracking-id" data-gdpr-tracking-url="The URL to send tracking data to">
  <p>Explain to the user what is being tracked and what is done with the tracking
    information.</p>
  <p>
    <label>
      <input type="checkbox" name="tracking-switch" data-gdpr-tracking-switch=""/>
      Activate Tracking
    </label>
  </p>
</div>
```

The plugin loads automatically and if the user has previously made a selection,
it automatically hides the tracking popup. The tracking on/off switch is stored
in the browser's localStorage.

### Show-hide the tracking information popup

When the user makes a choice regarding the tracking, it automatically hides the
popup. It is possible to have additional elements that show or hide the tracking
popup. These elements have to have an `data-gdpr-tracking-ui-toggle` attribute:

```html
<a href="#" data-gdpr-tracking-ui-toggle="">Learn more about tracking</a>
```

### Additional tracking switches

It is possible to have additional tracking switches that are outside the
main tracking element. As with the main switch, these simply need the attribute
`data-gdpr-tracking-switch` set. The plugin automatically ensures that all
switches are kept in line with the stored information.

```html
<label>
  <input type="checkbox" name="tracking-switch-2" data-gdpr-tracking-switch=""/>
  Tracking active
</label>
```

### Tracking labels

In order to update the interface depending on whether the tracking is active or not,
you can set the `data-gdpr-tracking-label` attribute on any element. If the
tracking is active, then the plugin sets the `"gdpr-tracking-active"` CSS
class on that element.

```html
<body data-gdpr-tracking-label="">
```
