const $navHome = $("#nav-home");
const $navProjects = $("#nav-projects");
const $navAbout = $("#nav-about");
const $navContact = $("#nav-contact");

const $bodyHome = $("#body-home");
const $bodyProjects = $("#body-projects");
const $bodyAbout = $("#body-about");
const $bodyContact = $("#body-contact");


$navHome.click(function(e) {
    $bodyHome.show();
    $bodyProjects.hide();
    $bodyAbout.hide();
    $bodyContact.hide();
});
$navProjects.click(function(e) {
    $bodyHome.hide();
    $bodyProjects.show();
    $bodyAbout.hide();
    $bodyContact.hide();
});
$navAbout.click(function(e) {
    $bodyHome.hide();
    $bodyProjects.hide();
    $bodyAbout.show();
    $bodyContact.hide();
});
$navContact.click(function(e) {
    $bodyHome.hide();
    $bodyProjects.hide();
    $bodyAbout.hide();
    $bodyContact.show();
});

$bodyProjects.hide();
$bodyAbout.hide();
$bodyContact.hide();

$("#contact-form").submit(function(e) {
    e.preventDefault();
    let bodyText = $('#contact-content').val() + "\n\n Sent to you from your website by " + $('#contact-name').val() + ", phone (if provided): " + $('#contact-phone').val();
    let data = {
        apikey: "0e1f14c3-52fc-43b9-b6e2-84b9e4468524",
        subject: "New Message from jdunbrack.com",
        from: "admin@jdunbrack.com",
        replyTo: $('#contact-email').val(),
        to: "jordan.dunbrack@gmail.com",
        bodyText: bodyText,
        isTransactional: false
    }
    console.log(data);
    $.post({
        url: "https://api.elasticemail.com/v2/email/send",
        data: data,
        success: function (data) {
            alert("Email has been sent successfully.\nPlease allow time for me to respond.");
        }
    })
    $('#contact-form').trigger('reset');
})