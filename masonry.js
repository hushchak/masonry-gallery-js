const COLUMN_WIDTH = 350;

function arrangeMasonries() {
    const masonries = document.querySelectorAll(".masonry-gallery");
    masonries.forEach((element) => arrangeMasonry(element));
}

function arrangeMasonry(gallery) {
    const columnCount = Math.max(Math.floor(gallery.offsetWidth / 350), 1);
    gallery.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;

    const images = getChildMasonryImages(gallery);
    clearMasonryColumns(gallery, images);

    if (gallery.classList.contains("sort")) {
        images.sort((image1, image2) => image2.offsetHeight - image1.offsetHeight);
    }

    const columns = [];
    for (let i = 0; i < columnCount; i++) {
        columns.push(insertMasonryColumn(gallery));
    }

    arrangeImagesInColumns(columns, images);
}

function clearMasonryColumns(gallery, images) {
    const columns = [...gallery.querySelectorAll(".masonry-column")];
    if (columns.length > 0) {
        images.forEach((image) => gallery.appendChild(image));
        columns.forEach((column) => column.remove());
    }
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
    return [...parentObject.querySelectorAll(".masonry-image")];
}

window.addEventListener("resize", () => {
    const masonries = document.querySelectorAll(".masonry-gallery");
    masonries.forEach((gallery) => {
        const columns = gallery.querySelectorAll(".masonry-column");
        const neededColumnCount = Math.max(Math.floor(gallery.offsetWidth / 350), 1);
        if (neededColumnCount !== columns.length) {
            console.log({neededColumnCount, columns: columns.length});
            arrangeMasonry(gallery);
        }
    });
});

arrangeMasonries();