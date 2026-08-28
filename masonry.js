const COLUMN_WIDTH = 350;

function arrangeMasonries() {
    const masonries = document.querySelectorAll(".masonry-gallery");
    masonries.forEach((element) => arrangeMasonry(element));
}

function arrangeMasonry(gallery) {
    const columnCount = Math.max(Math.floor(gallery.offsetWidth / 350), 1);
    gallery.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;

    const images = getChildMasonryImages(gallery);
    const columns = [];
    for (let i = 0; i < columnCount; i++) {
        columns.push(insertMasonryColumn(gallery));
    }

    arrangeImagesInColumns(columns, images);
}

function arrangeImagesInColumns(columns, images) {
    for (let i = 0; i < images.length; i++) {
        getShortestElement(columns).appendChild(images[i]);
    }
}

function getShortestElement(elements) {
    let shortestElement = elements[0];

    elements.forEach((element) => {
        if (element.offsetHeight < shortestElement.offsetHeight) {
            shortestElement = element;
        }
    });

    return shortestElement;
}

function insertMasonryColumn(element) {
    const column = document.createElement("div");
    column.classList.add("masonry-column");
    element.insertBefore(column, element.firstChild);
    return column;
}

function getChildMasonryImages(parentObject) {
    return parentObject.querySelectorAll(".masonry-image");
}

arrangeMasonries();