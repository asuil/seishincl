let rem = 1+(window.innerWidth / 100)|0;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function resizeDiags(){
	rem = 1+(window.innerWidth / 100)|0;
	let width = window.innerWidth;
    let scale = "scale(" + width / 40 + ", " + rem*3 / 40 + ")";
    let svgs = document.getElementsByClassName("do-resize");
    for(let i = 0; i < svgs.length; i++){
        svgs[i].style.transform = scale;
    }
}

function colorPaths(){
    let white_paths = document.getElementsByClassName('path-white');
    for(let i = 0; i < white_paths.length; i++){
        white_paths[i].setAttribute('fill', '#fefefe');
    }
    let red_paths = document.getElementsByClassName('path-red');
    for(let i = 0; i < red_paths.length; i++){
        red_paths[i].setAttribute('fill', '#dc0000');
    }
}

function scrollToDiv(id){
    document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'center' });
}

let sidebar;
let orientation;
let outOfIndex;
let line_containers;
let logo;
let darken;
async function showSidebar(just_run){

    if(!sidebar.matches(':hover') || just_run === true){

        if(orientation === "portrait"){

            outOfIndex = (document.getElementById("out-of-index").getBoundingClientRect().top < 20*rem);

            if(outOfIndex){
                sidebar.style.height = "17rem";
                await sleep(200);
                if(outOfIndex){
                    for (var i = 0; i < line_containers.length; i++) {
                        line_containers[i].style.display = "block";
                    }
                    logo.style.bottom = "13rem";
                }
            } else {
                for (var i = 0; i < line_containers.length; i++) {
                    line_containers[i].style.display = "none";
                }
                logo.style.bottom = 0;
                sidebar.style.height = 0;
            }
        }

        if(orientation === "landscape"){

            outOfIndex = (document.getElementById("out-of-index").getBoundingClientRect().top < 0);

            if(outOfIndex){
                sidebar.style.width = "4rem";
                await sleep(200);
                if(outOfIndex){
                    for (var i = 0; i < line_containers.length; i++) {
                        line_containers[i].style.display = "block";
                    }
                }
            } else {
                for (var i = 0; i < line_containers.length; i++) {
                    line_containers[i].style.display = "none";
                }
                sidebar.style.width = 0;
            }
        }
    }
}

function updateOrientation(){
    orientation = (window.orientation === 0) ? "portrait" : "landscape";
    if(orientation === "portrait"){
    	sidebar.style.width = "100rem";
    	sidebar.style.height = 0;
    	sidebar.style.bottom = 0;
    	logo.style.bottom = 0;
    	darken.style.display = "none";
	} else {
		sidebar.style.height = "27rem";
    	sidebar.style.width = 0;
    	sidebar.style.bottom = "10rem";
    	logo.style.bottom = 0;
    	if(sidebar.matches(':hover')){
    		return extendSidebar();
    	}
	}
	(sidebar.matches(':hover')) ? showSidebar(true) : showSidebar();
}

function extendSidebar(){
    if(orientation === "landscape"){
        sidebar.style.width = '15rem';
        darken.style.display = "block";
    }
}

function hoverSidebar(){
	extendSidebar();
}

async function unhoverSidebar(){
	showSidebar();
	await sleep(200);
	if(orientation === "landscape"){
		darken.style.display = "none";
	}
}

function afterLoad(){
    resizeDiags();
    colorPaths();
    sidebar = document.getElementsByClassName("sidebar")[0];
    line_containers = document.getElementsByClassName("line-container");
    logo = document.getElementsByClassName("logo")[0];
    darken = document.getElementsByClassName('darken')[0];
    updateOrientation();
    window.addEventListener("scroll", showSidebar);
    window.addEventListener("resize", resizeDiags);
    window.addEventListener("orientationchange", updateOrientation);
    sidebar.addEventListener("mouseenter", hoverSidebar);
    sidebar.addEventListener("mouseleave", unhoverSidebar);
}