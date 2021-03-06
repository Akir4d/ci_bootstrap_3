$(function () {

	var save_and_close = false;

	var reload_datagrid = function () {
		$('.refresh-data').trigger('click');
	};

	$('#save-and-go-back-button').click(function () {
		save_and_close = true;

		$('#crudForm').trigger('submit');
	});

	$('#crudForm').submit(function () {
		$(this).ajaxSubmit({
			url: validation_url,
			dataType: 'json',
			beforeSend: function () {
				$("#FormLoading").show();
			},
			cache: false,
			success: function (data) {
				$("#FormLoading").hide();
				if (data.success) {
					$('#crudForm').ajaxSubmit({
						dataType: 'text',
						cache: false,
						beforeSend: function () {
							$("#FormLoading").show();
						},
						success: function (result) {
							$("#FormLoading").fadeOut("slow");
							data = $.parseJSON(result);
							if (data.success) {
								if (save_and_close) {
									if ($('#save-and-go-back-button').closest('.ui-dialog').length === 0) {
										window.location = data.success_list_url;
									} else {
										$(".ui-dialog-content").dialog("close");
										success_message(data.success_message);
										reload_datagrid();
									}

									return true;
								}

								$('.field_error').removeClass('field_error');

								form_success_message(data.success_message);
								reload_datagrid();
							}
							else {
								form_error_message(message_update_error);
							}
						},
						error: function () {
							form_error_message(message_update_error);
						}
					});
				}
				else {
					$('.field_error').removeClass('field_error');
					form_error_message(data.error_message);
					$.each(data.error_fields, function (index, value) {
						$('#crudForm input[name=' + index + ']').addClass('field_error');
					});
				}
			}
		});
		return false;
	});



	if ($('#cancel-button').closest('.ui-dialog').length === 0) {

		$('#cancel-button').click(function () {
			if ($(this).hasClass('back-to-list') || confirm(message_alert_edit_form)) {
				window.location = list_url;
			}

			return false;
		});

	}

});

function SwTFbutton(value, type) {
	var target = "r-" + value + (type ? "-true" : "-false"); 
	var target2 = "field-" + value + (type ? "-false" : "-true"); 
	var target3 = "r-" + value + (type ? "-false" : "-true");
	$("#" + target).addClass("hidden"); 
	$("#" + target2).click(); 
	$("#" + target3).removeClass('hidden');
}

$(document).ready(function() {
	$('.qq-upload-button').removeClass('qq-upload-button').addClass('btn btn-default');
});

