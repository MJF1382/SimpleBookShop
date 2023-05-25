const modalContainer = document.getElementById("modalContainer")
const createBook = document.getElementById("createBook")
const body = document.getElementById("body")

// Useful Functions
const loadBooksList = async () => {
    const response = await fetch("/Book/GetBooksList");
    if (response.ok) {
        body.innerHTML = await response.text();
    } else {
        modalContainer.innerHTML = "<div>خطا در اتصال به سرور. لطفا بعدا دوباره امتحان کنید.</div>"
    }
}


// Main
loadBooksList();
const cancel = () => {
    modalContainer.innerHTML = ""
}

// Create
createBook.addEventListener("click", async (e) => {
    e.preventDefault();

    const response = await fetch("/Book/Create")
    const content = await response.text();

    modalContainer.innerHTML = content;
})
const handlerCreateBook = async (e) => {
    e.preventDefault();
    const target = e.target;

    const response = await fetch(target.getAttribute("action"), {
        method: "POST",
        body: new FormData(target)
    })

    if (response.ok) {
        const result = JSON.parse(await response.text());

        if (result.status === 200) {
            modalContainer.innerHTML = "<div>کتاب با موفقیت ثبت شد</div>";
            loadBooksList();
        } else {
            const errorNotification = document.getElementById("errorNotification")
            errorNotification.innerText = result.errorText;
        }
    } else {
        modalContainer.innerHTML = "<div>خطا در اتصال به سرور. لطفا بعدا دوباره امتحان کنید.</div>"
    }
}


// Edit
const editBook = async (e) => {
    e.preventDefault();

    const isbn = e.target.dataset.isbn
    const response = await fetch("/Book/Edit/" + isbn)

    if (response.ok) {
        modalContainer.innerHTML = await response.text()
    } else if (response.status === 404) {
        modalContainer.innerHTML = "<div>کتاب مورد نظر یافت نشد</div>"
    } else {
        modalContainer.innerHTML = "<div>خطا در اتصال به سرور. لطفا بعدا دوباره امتحان کنید.</div>"
    }
}
const handlerEditBook = async (e) => {
    e.preventDefault();
    const target = e.target;

    const response = await fetch(target.getAttribute("action"), {
        method: "PUT",
        body: new FormData(target)
    })

    if (response.ok) {
        const result = JSON.parse(await response.text());

        if (result.status === 200) {
            modalContainer.innerHTML = "<div>کتاب با موفقیت ویرایش شد</div>";
            loadBooksList();
        } else {
            const errorNotification = document.getElementById("errorNotification")
            errorNotification.innerText = result.errorText;
        }
    } else {
        modalContainer.innerHTML = "<div>خطا در اتصال به سرور. لطفا بعدا دوباره امتحان کنید.</div>"
    }
}

// Delete
const deleteBook = async (e) => {
    e.preventDefault();

    const isbn = e.target.dataset.isbn
    const response = await fetch("/Book/Delete/" + isbn)

    if (response.ok) {
        modalContainer.innerHTML = await response.text()
    } else if (response.status === 404) {
        modalContainer.innerHTML = "<div>کتاب مورد نظر یافت نشد</div>"
    } else {
        modalContainer.innerHTML = "<div>خطا در اتصال به سرور. لطفا بعدا دوباره امتحان کنید.</div>"
    }
}
const handlerDeleteBook = async (e) => {
    e.preventDefault();

    const response = await fetch(e.target.getAttribute("action"), {
        method: "DELETE",
        body: new FormData(e.target)
    })

    if (response.ok) {
        const result = JSON.parse(await response.text());

        if (result.status === 200) {
            modalContainer.innerHTML = "<div>کتاب با موفقیت حذف شد</div>";
            loadBooksList();
        } else {
            const errorNotification = document.getElementById("errorNotification")
            errorNotification.innerText = result.errorText;
        }
    } else {
        modalContainer.innerHTML = "<div>خطا در اتصال به سرور. لطفا بعدا دوباره امتحان کنید.</div>"
    }
}