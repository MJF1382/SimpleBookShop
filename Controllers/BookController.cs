using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SimpleBookShop.Helpers.Classes;
using SimpleBookShop.Helpers.Extensions;
using SimpleBookShop.Models;
using SimpleBookShop.Models.Entities;
using SimpleBookShop.Models.ViewModels;

namespace SimpleBookShop.Controllers
{
    public class BookController : BaseController
    {
        private BookShopDBContext _context;

        public BookController(BookShopDBContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            int count = await _context.Books.CountAsync();

            ViewBag.ItemsCount = count.ToString();

            return View();
        }

        public async Task<IActionResult> GetBooksList(string title = "", int pageIndex = 0)
        {
            if (title.HasValue() == false)
            {
                title = "";
            }

            List<BookViewModel> model = await _context.Books
                .Where(p => p.Title.Contains(title))
                .Select(book => new BookViewModel()
                {
                    Isbn = book.Isbn,
                    Title = book.Title,
                    Category = book.Category.Name,
                    Price = book.Price
                })
                .OrderBy(p => p.Isbn)
                .ToListAsync();

            ViewBag.PageCount = Math.Ceiling(model.Count / 5.0);

            model = model
                .Skip(pageIndex * 5)
                .Take(5)
                .ToList();

            return PartialView("_BooksList", model);
        }

        [HttpGet]
        public IActionResult Create()
        {
            ViewBag.Categories = new SelectList(_context.Categories, "Id", "Name");

            return PartialView("_Create");
        }

        [HttpPost]
        public async Task<Result> Create(BookViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                Book book = new Book()
                {
                    Isbn = viewModel.Isbn,
                    Title = viewModel.Title,
                    CategoryId = int.Parse(viewModel.Category),
                    Price = viewModel.Price
                };

                await _context.AddAsync(book);
                bool result = Convert.ToBoolean(await _context.SaveChangesAsync());

                if (result)
                {
                    return new Result(Helpers.Enums.ResultType.Success);
                }
                else
                {
                    return new Result(Helpers.Enums.ResultType.Failed, Server_Error);
                }
            }
            else
            {
                return new Result(Helpers.Enums.ResultType.Failed, "لطفا همۀ اطلاعات را وارد کنید.");
            }
        }

        [HttpGet]
        public async Task<IActionResult> Edit(string id)
        {
            Book? book = await _context.Books.FindAsync(id);

            if (book != null)
            {
                ViewBag.Categories = new SelectList(_context.Categories, "Id", "Name");

                BookViewModel model = new BookViewModel()
                {
                    Isbn = book.Isbn,
                    Title = book.Title,
                    Category = book.CategoryId.ToString(),
                    Price = book.Price
                };

                return PartialView("_Edit", model);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPut]
        public async Task<Result> Edit(BookViewModel viewModel)
        {
            Book? book = await _context.Books.FindAsync(viewModel.Isbn);

            if (book != null)
            {
                book.Title = viewModel.Title;
                book.CategoryId = int.Parse(viewModel.Category);
                book.Price = viewModel.Price;

                _context.Books.Update(book);
                bool result = Convert.ToBoolean(await _context.SaveChangesAsync());

                if (result)
                {
                    return new Result(Helpers.Enums.ResultType.Success);
                }
                else
                {
                    return new Result(Helpers.Enums.ResultType.Failed, Server_Error);
                }
            }
            else
            {
                return new Result(Helpers.Enums.ResultType.Failed, NotFound_Error);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Delete(string id)
        {
            if (await _context.Books.AnyAsync(p => p.Isbn == id))
            {
                return PartialView("_Delete", id);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpDelete]
        public async Task<Result> DeleteConfirm(string id)
        {
            Book? book = await _context.Books.FindAsync(id);

            if (book != null)
            {
                _context.Books.Remove(book);
                bool result = Convert.ToBoolean(await _context.SaveChangesAsync());

                if (result)
                {
                    return new Result(Helpers.Enums.ResultType.Success);
                }
                else
                {
                    return new Result(Helpers.Enums.ResultType.Failed, Server_Error);
                }
            }
            else
            {
                return new Result(Helpers.Enums.ResultType.Failed, NotFound_Error);
            }
        }

        public IActionResult ShowMessage(string message, MessageType messageType)
        {
            ViewBag.MessageType = messageType;
            ViewBag.Message = message;

            return PartialView("_PopupMessage");
        }
    }
}