using System;
using System.Collections.Generic;

namespace SimpleBookShop.Models.Entities
{
    public partial class Order
    {
        public Order()
        {
            OrderBooks = new HashSet<OrderBook>();
        }

        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string? Description { get; set; }
        public DateTime BuyDate { get; set; }

        public virtual Customer Customer { get; set; } = null!;
        public virtual ICollection<OrderBook> OrderBooks { get; set; }
    }
}
