// Global variables
var active_page = 'index';
var active_language = 'el';
var language_text;
var menu_and_footer_text;
var content_text;


// Get elements
const main_container = document.getElementById('main'); // main
const menu_and_footer_elements = [...document.querySelectorAll('.menu-item')]; // menu and footer
const flags = [...document.querySelectorAll('.flag')] // flags

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

// Set menu items listeners
menu_and_footer_elements.forEach(element => {
    element.addEventListener('click', (e) => {
        menu_and_footer_elements.forEach(el => el.classList.remove('active-link')); //remove all active link classes
        let page = e.target.id;
        select_page(page);
        element.classList.add('active-link')
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
    build_language_content()
}

// Build content according to language and page selections/variables
function build_language_content() {
    language_text = text[active_language];

    // Set Menu and Footer
    menu_and_footer_text = language_text['menu-and-footer'];
    menu_and_footer_elements.forEach(element => {
        if (element.id) {
            if (menu_and_footer_text[element.id]) {
                element.innerHTML = menu_and_footer_text[element.id];
            }
        }
    })

    //Clear Content
    main_container.innerHTML = '';

    // Create Content
    content_text = language_text[active_page];
    for (const content in content_text) {
        let object = content_text[content]
        let type = object.type;
        let template = document.querySelector(`template#${type}`)
        if (template) {
            let element = template.content.cloneNode(true);

            if (type == 'article-main') {
                let img = element.querySelector('img');
                let h1 = element.querySelector('h1');
                let p = element.querySelector('p');
                img.src = object.image;
                h1.innerHTML = object.heading;
                p.innerHTML = object.body;
            }

            if (type == 'article-blockquote') {
                let img = element.querySelector('img');
                let div = element.querySelector('div.blockquote > div');
                let p = element.querySelector('p')
                img.src = object.image;
                div.innerHTML = object.heading;
                p.innerHTML = object.body;

            }

            main_container.appendChild(element);
        }
    }
}

build_language_content();

// Select page
const select_page = (page) => {
    active_page = page;
    build_language_content();

}