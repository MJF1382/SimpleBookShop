using System;
using System.Collections.Generic;

namespace SimpleBookShop.Models.Entities
{
    public partial class Category
    {
        public Category()
        {
            Books = new HashSet<Book>();
            InverseParent = new HashSet<Category>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int? ParentId { get; set; }

        public virtual Category? Parent { get; set; }
        public virtual ICollection<Book> Books { get; set; }
        public virtual ICollection<Category> InverseParent { get; set; }
    }
}
