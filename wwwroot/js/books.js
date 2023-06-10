const modalContainer = document.getElementById("modalContainer")
const modalBody = document.getElementById("modalBody")
const createBook = document.getElementById("createBook")
const tableContent = document.getElementById("tableContent")
const tabControl = document.getElementById("tabcontrol")
const pagination = document.getElementById("pagination")
let btnPaginationPrevious = null
let btnPaginationNext = null

// Base
const loadBooksList = async (title = "", pageIndex = 0, shouldRepaginate = true) => {
    const response = await fetch(`/Book/GetBooksList?title=${title}&pageIndex=${pageIndex}`);
    if (response.ok) {
        const htmlContent = await response.text()
        const pageCount = htmlContent.split("pagecount")[1]
        tableContent.innerHTML = htmlContent;

        if (shouldRepaginate === true) {
            createPagination(pageCount, pageIndex)
        }
    } else {
        showMessage("خطا در اتصال به سرور. لطفا بعدا دوباره امتحان کنید.", "Failed")
    }
}


// Main
loadBooksList();
const cancel = () => {
    hideModal()
}
const handlerSearch = (e) => {
    loadBooksList(e.currentTarget.value)
}


// Create
createBook.addEventListener("click", async (e) => {
    e.preventDefault();

    const response = await fetch("/Book/Create")
    const content = await response.text();

    modalBody.innerHTML = content;
    showModal()
})
const handlerCreateBook = async (e) => {
    e.preventDefault();
    const target = e.currentTarget;

    const response = await fetch(target.getAttribute("action"), {
        method: "POST",
        body: new FormData(target)
    })

    if (response.ok) {
        const result = JSON.parse(await response.text());

        if (result.status === 200) {
            showMessage("کتاب با موفقیت ثبت شد.", "Success")
            loadBooksList();
        } else {
            showMessage(result.errorText, "Failed")
        }
    } else {
        showMessage("خطا در اتصال به سرور. لطفا بعدا دوباره امتحان کنید.", "Failed")
    }
}


// Edit
const editBook = async (e) => {
    e.preventDefault();

    const isbn = e.currentTarget.dataset.isbn
    const response = await fetch("/Book/Edit/" + isbn)

    if (response.ok) {
        modalBody.innerHTML = await response.text()
    } else if (response.status === 404) {
        showMessage("کتاب مورد نظر یافت نشد", "Failed")
    } else {
        showMessage("خطا در اتصال به سرور. لطفا بعدا دوباره امتحان کنید.", "Failed")
    }
    showModal()
}
const handlerEditBook = async (e) => {
    e.preventDefault();
    const target = e.currentTarget;

    const response = await fetch(target.getAttribute("action"), {
        method: "PUT",
        body: new FormData(target)
    })

    if (response.ok) {
        const result = JSON.parse(await response.text());

        if (result.status === 200) {
            showMessage("کتاب با موفقیت ویرایش شد", "Success")
            loadBooksList();
        } else {
            showMessage(result.errorText, "Failed")
        }
    } else {
        showMessage("خطا در اتصال به سرور. لطفا بعدا دوباره امتحان کنید.", "Failed")
    }
}


// Delete
const deleteBook = async (e) => {
    e.preventDefault();

    const isbn = e.currentTarget.dataset.isbn
    const response = await fetch("/Book/Delete/" + isbn)

    if (response.ok) {
        modalBody.innerHTML = await response.text()
    } else if (response.status === 404) {
        showMessage("کتاب مورد نظر یافت نشد", "Failed")
    } else {
        showMessage("خطا در اتصال به سرور. لطفا بعدا دوباره امتحان کنید.", "Failed")
    }
    showModal()
}
const handlerDeleteBook = async (e) => {
    e.preventDefault();

    const response = await fetch(e.currentTarget.getAttribute("action"), {
        method: "DELETE",
        body: new FormData(e.currentTarget)
    })

    if (response.ok) {
        const result = JSON.parse(await response.text());

        if (result.status === 200) {
            showMessage("کتاب با موفقیت حذف شد", "Success")
            loadBooksList();
        } else {
            showMessage(result.errorText, "Failed")
        }
    } else {
        showMessage("خطا در اتصال به سرور. لطفا بعدا دوباره امتحان کنید.", "Failed")
    }
}


// Pagination
const createPagination = (pageCount, pageIndex) => {
    let pages = ""

    for (var i = 0; i < pageCount; i++) {
        pages += `
            <button id="page_${i}" class="pagination-button ${((pageIndex + 1) == i + 1) ? "pagination-active" : ""}" onClick="moveToPage(${i})">
                ${toPersianNumber((i + 1).toString())}
            </button>

        `
    }

    pagination.innerHTML = `
        <button id="paginationPrevious" class="pagination-button" data-pageindex="${pageIndex}" onClick="previousPage(event)">
            <i class="fa-solid fa-angle-right"></i>
        </button>
        ${pages}
        <button id="paginationNext" class="pagination-button" data-pageindex="${pageIndex}" onClick="nextPage(event, ${pageCount})">
            <i class="fa-solid fa-angle-left"></i>
        </button>
    `
    btnPaginationPrevious = document.getElementById("paginationPrevious")
    btnPaginationNext = document.getElementById("paginationNext")
}
const moveToPage = (pageIndex) => {
    loadBooksList('', pageIndex, false);
    changePage(pageIndex);
    const activePgaeId = findActivePage().id.replace("page_", "")

    btnPaginationPrevious.setAttribute("data-pageindex", activePgaeId)
    btnPaginationNext.setAttribute("data-pageindex", activePgaeId)
}
const previousPage = (e) => {
    const pageIndex = Number(e.currentTarget.dataset.pageindex)

    if (pageIndex > 0) {
        loadBooksList('', pageIndex - 1, false)
        changePage(pageIndex - 1)
        const activePgaeId = findActivePage().id.replace("page_", "")

        btnPaginationPrevious.setAttribute("data-pageindex", activePgaeId)
        btnPaginationNext.setAttribute("data-pageindex", activePgaeId)
    }
}
const nextPage = (e, pageCount) => {
    const pageIndex = Number(e.currentTarget.dataset.pageindex)

    if (pageIndex != pageCount - 1) {
        loadBooksList('', pageIndex + 1, false)
        changePage(pageIndex + 1);
        const activePgaeId = findActivePage().id.replace("page_", "")

        btnPaginationPrevious.setAttribute("data-pageindex", activePgaeId)
        btnPaginationNext.setAttribute("data-pageindex", activePgaeId)
    }
}
const findActivePage = () => {
    return document.getElementsByClassName("pagination-active")[0];
}
const assignActivePage = (pageElement) => {
    pageElement.classList.add("pagination-active")
}
const removeActivePage = () => {
    findActivePage().classList.remove("pagination-active");
}
const changePage = (pageIndex) => {
    removeActivePage();
    assignActivePage(document.getElementById("page_" + pageIndex));
}


// TabControl
const handlerTabItemSelect = (e) => {
    resetActiveTabItem();
    e.currentTarget.parentElement.classList.add("tabitem-active")
}
const resetActiveTabItem = () => {
    let activeTabItem = Array.from(tabControl.children).find(p => p.classList.contains("tabitem-active"))
    activeTabItem.classList.remove("tabitem-active")
}


// Modal
const showModal = () => {
    modalContainer.style.display = "block";
}
const hideModal = () => {
    modalContainer.style.display = "none";
}
const showMessage = async (message, messageType) => {
    const response = await fetch(`/Book/ShowMessage?message=${message}&messageType=${messageType}`)

    if (response.ok) {
        modalBody.innerHTML = await response.text();
        showModal();
    }
}

// Useful Functions
const toPersianNumber = (input) => {
    return input
        .replace("0", "۰")
        .replace("1", "۱")
        .replace("2", "۲")
        .replace("3", "۳")
        .replace("4", "۴")
        .replace("5", "۵")
        .replace("6", "۶")
        .replace("7", "۷")
        .replace("8", "۸")
        .replace("9", "۹");
}
const toEnglishNumber = (input) => {
    return input
        .replace("۰", "0")
        .replace("۱", "1")
        .replace("۲", "2")
        .replace("۳", "3")
        .replace("۴", "4")
        .replace("۵", "5")
        .replace("۶", "6")
        .replace("۷", "7")
        .replace("۸", "8")
        .replace("۹", "9");
}