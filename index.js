// Global variables
var active_page = 'index';
var active_language = 'el';

// Get elements
const main_container = document.getElementById('main'); // main
const menu_elements = [...document.querySelectorAll('.menu-item')];
const flags = [...document.querySelectorAll('.flag')] // flags
const hamburger = document.getElementById('menu-toggle');
const logo = document.getElementById('logo');

// Get languages-and-content from JSON file
async function get_text(jsonFile) {
    const response = await fetch(`js/${jsonFile}.json`);
    return response.json();
}
const text = await get_text('languages-and-content');

// Set flag elements listenrers
flags.forEach(flag => {
    flag.addEventListener('click', (e) => {
        select_language(e.target)
    })
})

// Set logo listener
logo.addEventListener('click', (e) => {
    if (active_page !== 'index') {
        let active_item = document.querySelector('.active-link');
        active_item.classList.remove('active-link');
        select_page('index');
        let index_btn = document.querySelector('#index')
        index_btn.classList.add('active-link')
    }
})

const click_menu_item = (e) => {
    let item = e.target;
    if (item !== active_page) {
        let active_item = document.querySelector('.active-link');
        active_item.classList.remove('active-link');
        select_page(item.id);
        item.classList.add('active-link')
    }
}

// Set menu items listeners
menu_elements.forEach(element => {
    element.addEventListener('click', (e) => {
        click_menu_item(e);
    })
})

// Remove active flag class
const remove_active_flags = () => {
    flags.forEach(flag => {
        flag.classList.remove('active-flag')
    })
}

// Select language from icon
function select_language(that) {
    remove_active_flags() // remove active
    that.classList.add('active-flag') // assign active class to element
    active_language = that.id; // assign language to variable
    build_content(active_page);
    hamburger.checked = false;
}

// Build content according to language and page selections/variables
function build_content(page) {

    // Set Menu and Footer
    let menu_and_footer_text = text['menu-and-footer']
    menu_elements.forEach(element => {
        if (menu_and_footer_text[element.id]) {
            if ([element.id]) {
                element.innerHTML = menu_and_footer_text[element.id][active_language];
            }
        }
    })

    //Create Content
    main_container.innerHTML = ''; // Clear existing content
    let page_object = text[page];


    for (let section in page_object) {
        let section_object = page_object[section];
        let type = page_object[section].type;
        let template = document.querySelector(`template#${type}`)

        if (template) {
            let element = template.content.cloneNode(true);

            let img = element.querySelector('img');
            let h1 = element.querySelector('h1');
            let p = element.querySelector('p');
            let div = element.querySelector('div.blockquote > div');
            let v = element.querySelector('source');

            img ? img.src = section_object.image : null;
            h1 ? h1.innerHTML = section_object[active_language].heading : null;
            p ? p.innerHTML = section_object[active_language].body : null;
            div ? div.innerHTML = section_object[active_language].heading : null;
            v ? v.src = section_object.video : null;

            // if (type == 'article-main' || type == 'link') {

            //     // Add special class to index page, 1st content
            //     if (active_page == 'index' && section == '01') {
            //         h1.classList.remove('fs-700');
            //         h1.classList.add('fs-750');
            //         active_language == 'el' ? h1.classList.add('welcome-greek') : null
            //     }
            // }

            main_container.appendChild(element);
        }
    }
    hamburger.checked = false;
}

build_content(active_page);

// Select page
const select_page = (page) => {
    active_page = page;
    build_content(active_page);
}

// Stop animations on resize
let resizeTimer;
window.addEventListener("resize", () => {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
    }, 400);
});