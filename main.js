w3.includeHTML();

// UI elements
var projects = document.getElementsByClassName("project-link");
var projectContent = document.getElementById("project-content");
var pageTitle = document.getElementById("page-title");
var drawer = document.getElementsByClassName("mdl-layout__drawer")[0];
var projectTypes = document.getElementsByClassName("project-type");
var activeProject;
var galleryRatio = 4/3;

// Event listeners
window.addEventListener('DOMContentLoaded', load);
window.addEventListener('resize', setLayout);
window.addEventListener('popstate', onPopState);
for (var i = 0; i < projects.length; i++) { projects[i].addEventListener('click', onProjectClick); }
for (var i = 0; i < projectTypes.length; i++) { projectTypes[i].addEventListener('click', toggleRegion); }

function getProjectUrlFromPath() {
    let path = new URL(window.location.href).pathname.split("/")[1];
    return path;
}

function onPopState() {
    switchProjects(getProjectUrlFromPath());
}

function load()
{
    const project = getProjectUrlFromPath();

    setLayout();

    if (project !== "") {
        switchProjects(project);
    } else {
        switchProjects("about-me.html")
    }

    setTheme();
}

function setTheme() {

    const projectColour = getComputedStyle(activeProject).backgroundColor

    const themed = document.getElementsByClassName("themed");
    const icons = document.getElementsByClassName("material-icons");
    const inputs = document.getElementsByClassName("mdl-textfield__input");

    for (var i = 0; i < themed.length; i++) { icons[i].style.color = projectColour };
    for (var i = 0; i < icons.length; i++) { icons[i].style.color = projectColour };
    for (var i = 0; i < inputs.length; i++) { inputs[i].style.color = projectColour };
}

function setLayout()
{
    if (document.documentElement.clientWidth < 1024)
    {
        projectContent.style.marginLeft = "16px";
        projectContent.style.marginRight = "16px";
    }
    else
    {
        projectContent.style.marginLeft = "40px";
        projectContent.style.marginRight = "40px";
    }

    // Set the video element size
    var videos = document.getElementsByClassName("youtube");
    for (i = 0; i < videos.length; i++)
    {
        videos[i].height = videos[i].clientWidth/16*9;
    }

    // Set the gallery elements size
    var galleries = document.getElementsByClassName("gallery");
    for (i = 0; i < galleries.length; i++)
    {
        galleries[i].style.height =  galleries[i].clientWidth*0.6/galleryRatio + "px";
        galleries[i].children[1].addEventListener('click', gallery_scroll);
        galleries[i].children[2].addEventListener('click', gallery_scroll);

        var index = Math.round(galleries[i].children[0].scrollLeft/galleries[i].clientWidth);
        galleries[i].children[0].scrollLeft = galleries[i].clientWidth * index;
    }
}

function onProjectClick(clickEvent) {

    const projectUrl = clickEvent.srcElement.id + ".html";
    switchProjects(projectUrl);
    setTheme();

    // Set the URL
    window.history.pushState("1", "2", projectUrl);
}

/**
 * @param {string} projectId The id of the project (lower-snake case)
 */
function switchProjects(projectUrl) {

    const projectId = projectUrl.replace(".html", "");
    const projectElement = document.getElementById(projectId);
    let projectName = projectElement.innerText;
    projectName = projectName === "Dominic Ayre" ? "About me" : projectName;

    // Change the title
    pageTitle.innerHTML = projectName;

    // Set this as the active project in the sidebar
    if (activeProject) activeProject.classList.remove("active");
    projectElement.classList.add("active");
    activeProject = projectElement;

    // Switch out page content (ASSUMING CONTENT WILL EXIST)
    projectContent.setAttribute("w3-include-html", "pages/" + projectName + "/" + projectUrl);


    // Close the sidebar
    var obfuscator = document.getElementsByClassName("mdl-layout__obfuscator")[0];
    if (obfuscator != null) {
        obfuscator.classList.remove('is-visible');
        drawer.classList.remove('is-visible');
    }

    w3.includeHTML(setLayout);
}

function toggleRegion(projectType)
{
    // Get the project details
    var element = projectType.srcElement;
    if (element.outerHTML.startsWith("<b")) element = projectType.srcElement.parentElement;
    var type = element.innerText;

    // Get the elements
    var region = document.getElementById(type + " PROJECTS");
    var wrapper = document.getElementById(type + " WRAPPER");

    // Change the height
    if (region.clientHeight)
    {
        region.style.height = 0;
        element.classList.remove("active");
    }
    else
    {
        region.style.height = wrapper.clientHeight + "px";
        element.classList.add("active");
    }

}

function gallery_scroll(button)
{
    var gallery = button.srcElement.parentElement;
    var scroll_amount = 1;
    if (button.srcElement.classList.contains("gallery-back")) { scroll_amount = -scroll_amount; }

    var index = Math.round(gallery.children[0].scrollLeft/gallery.clientWidth);

    $(gallery.children[0]).animate
    (
        {
            scrollLeft: gallery.clientWidth * (index + scroll_amount)
        }
    );
}
