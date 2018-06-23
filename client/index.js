(function($) {
    /**
     * The tracking jQuery plugin provides functionality for tracking interactions
     * in a GDPR-compliant manner.
     */
    var methods = {
        init: function(options) {
            return this.each(function() {
                var component = $(this);

                var tracking_id = 'gdpr-tracking-' + component.data('gdpr-tracking');

                if(localStorage.getItem(tracking_id) !== null) {
                    component.hide();
                }
                if(localStorage.getItem(tracking_id) === 'true') {
                    $('*[data-gdpr-tracking-label]').addClass('gdpr-tracking-active');
                }
                $('input[data-gdpr-tracking-switch][type=checkbox]').prop('checked', localStorage.getItem(tracking_id) === 'true');
                $('input[data-gdpr-tracking-switch][type!=checkbox]').val((localStorage.getItem(tracking_id) === 'true').toString());
                $('*[data-gdpr-tracking-switch]').on('change', function() {
                    if(this.getAttribute('type') === 'checkbox') {
                        var consented = $(this).filter(':checked').length > 0;
                    } else {
                        var consented = $(this).val() === 'true';
                    }
                    component.hide();
                    localStorage.setItem(tracking_id, consented);
                    $('input[data-gdpr-tracking-switch][type=checkbox]').prop('checked', consented);
                    $('input[data-gdpr-tracking-switch][type!=checkbox]').val(consented.toString());
                    if(consented) {
                        $('*[data-gdpr-tracking-label]').addClass('gdpr-tracking-active');
                    } else {
                        $('*[data-gdpr-tracking-label]').removeClass('gdpr-tracking-active');
                    }
                });
                $('*[data-gdpr-tracking-ui-toggle]').on('click', function(ev) {
                    ev.preventDefault();
                    if(component.is(':visible') && localStorage.getItem(tracking_id) === null) {
                        localStorage.setItem(tracking_id, false);
                    }
                    component.toggle();
                });
            });
        },
        track: function(data) {
            return this.each(function() {
                var component = $(this);

                if(localStorage.getItem('gdpr-tracking-' + component.data('gdpr-tracking')) === 'true') {
                    if(localStorage.getItem('gdpr-tracking-' + component.data('gdpr-tracking') + '-user') !== null) {
                        data['gdpr-tracking-user'] = localStorage.getItem('gdpr-tracking-' + component.data('gdpr-tracking') + '-user');
                    }
                    data['gdpr-tracking-app'] = component.data('gdpr-tracking');
                    var promise = fetch(component.data('gdpr-tracking-url'), {
                        body: JSON.stringify(data),
                        credentials: 'same-origin',
                        headers: {
                            'content-type': 'application/json'
                        },
                        method: 'POST',
                        referrer: 'no-referrer'
                    });
                    promise.then(function(response) {
                        response.json().then(function(data) {
                            localStorage.setItem('gdpr-tracking-' + component.data('gdpr-tracking') + '-user', data['gdpr-tracking-user']);
                        });
                    });
                }
            });
        }
    };

    $.fn.gdpr_tracking = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.gdpr_tracking');
        }
    };
}(jQuery));

$('*[data-gdpr-tracking]').gdpr_tracking();
