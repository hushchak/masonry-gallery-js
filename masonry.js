const COLUMN_WIDTH = 350;

function arrangeMasonries() {
    const masonries = document.querySelectorAll(".masonry-gallery");
    masonries.forEach((element) => arrangeMasonry(element));
}

function arrangeMasonry(gallery) {
    const columnCount = Math.max(Math.floor(gallery.offsetWidth / 350), 1);
    gallery.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
}

arrangeMasonries();