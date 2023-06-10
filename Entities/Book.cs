using System;
using System.Collections.Generic;

namespace SimpleBookShop.Entities
{
    public partial class Book
    {
        public Book()
        {
            OrderBooks = new HashSet<OrderBook>();
        }

        public string Isbn { get; set; } = null!;
        public string Title { get; set; } = null!;
        public int CategoryId { get; set; }
        public int Price { get; set; }

        public virtual Category Category { get; set; } = null!;
        public virtual ICollection<OrderBook> OrderBooks { get; set; }
    }
}
