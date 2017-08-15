w3.includeHTML();

// UI elements
var projects = document.getElementsByClassName("project-link");
var projectContent = document.getElementById("project-content");
var pageTitle = document.getElementById("page-title");
var icons = document.getElementsByClassName("material-icons");
var inputs = document.getElementsByClassName("mdl-textfield__input");
var drawer = document.getElementsByClassName("mdl-layout__drawer")[0];
var projectTypes = document.getElementsByClassName("project-type");
var activeProject;

// Event listeners
window.addEventListener('load', load);
window.addEventListener('resize', setLayout);
for (var i = 0; i < projects.length; i++) { projects[i].addEventListener('click', switchProjects); }
for (var i = 0; i < projectTypes.length; i++) { projectTypes[i].addEventListener('click', toggleRegion); }

function load()
{
    setLayout();
}

function setLayout()
{
    if (document.documentElement.clientWidth < 800)
    {        
        projectContent.style.marginLeft = "16px";
        projectContent.style.marginRight = "16px";
    }
    else if (document.documentElement.clientWidth < 1024)
    {
        projectContent.style.marginLeft = "72px";
        projectContent.style.marginRight = "16px";
    }
    else
    {
        projectContent.style.marginLeft = "40px";
        projectContent.style.marginRight = "40px";
    }

    // Set the gallery elements size
    var galleries = document.getElementsByClassName("gallery");
    for (i = 0; i < galleries.length; i++)
    {
        galleries[i].style.height =  galleries[i].clientWidth*0.6/16*9 + "px";
        galleries[i].children[1].addEventListener('click', gallery_scroll);
        galleries[i].children[2].addEventListener('click', gallery_scroll);
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

    // Change colour theme
    for (var i = 0; i < icons.length; i++) { icons[i].style.color = projectColour };
    for (var i = 0; i < inputs.length; i++) { inputs[i].style.color = projectColour };

    // Close the sidebar
    var obfuscator = document.getElementsByClassName("mdl-layout__obfuscator")[0];
    obfuscator.classList.remove('is-visible');        
    drawer.classList.remove('is-visible');  

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
    var scroll_amount = gallery.clientWidth;
    if (button.srcElement.classList.contains("gallery-back")) { scroll_amount = -scroll_amount; }

    $(gallery.children[0]).animate
    (
        {
            scrollLeft: gallery.children[0].scrollLeft + scroll_amount
        }
    );
}