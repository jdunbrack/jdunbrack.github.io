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