w3.includeHTML();

// UI elements
var projects = document.getElementsByClassName("project-link");
var projectContent = document.getElementById("project-content");
var pageTitle = document.getElementById("page-title");
var icons = document.getElementsByClassName("material-icons");
var inputs = document.getElementsByClassName("mdl-textfield__input");
var activeProject;

// Event listeners
window.addEventListener('load', setLayout);
window.addEventListener('resize', setLayout);
for (var i = 0; i < projects.length; i++) { projects[i].addEventListener('click', switchProjects); }

function setLayout()
{
    if (document.documentElement.clientWidth > 1024)
    {
        projectContent.style.marginLeft = "40px";
        projectContent.style.marginRight = "40px";
    }
    else
    {
        projectContent.style.marginLeft = "72px";
        projectContent.style.marginRight = "16px";
    }
}

function switchProjects(project)
{
    // Get the project details
    var projectName = project.srcElement.innerHTML; 
    var projectColour = getComputedStyle(project.srcElement).backgroundColor;

    // If user clicks my name, go to about page
    if (projectName == "Dominic Ayre") projectName = "About me";
   
    // Set this as the active project
    if (activeProject) activeProject.classList.remove("active");
    project.srcElement.classList.add("active");
    activeProject = project.srcElement;

    // Change the title
    pageTitle.innerHTML = projectName;

    // Switch out page content (ASSUMING CONTENT WILL EXIST)
    projectContent.setAttribute("w3-include-html", "pages/" + projectName + ".html");
    w3.includeHTML();

    // Change colour theme
    for (var i = 0; i < icons.length; i++) { icons[i].style.color = projectColour };
    for (var i = 0; i < inputs.length; i++) { inputs[i].style.color = projectColour };
}