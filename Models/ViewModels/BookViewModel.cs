using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace SimpleBookShop.Models.ViewModels
{
    public class BookViewModel
    {
        [Display(Name = "شابک*")]
        [DisplayName("شابک*")]
        [Required(ErrorMessage = "شابک کتاب را وارد کنید.")]
        [StringLength(13, ErrorMessage = "شابک کتاب باید 10 یا 13 رقمی باشد.")]
        public string Isbn { get; set; }

        [Display(Name = "عنوان*")]
        [DisplayName("عنوان*")]
        [Required(ErrorMessage = "عنوان کتاب را وارد کنید.")]
        [StringLength(100, ErrorMessage = "عنوان کتاب باید حداکثر 100 کاراکتر باشد.")]
        public string Title { get; set; }

        [Display(Name = "دسته بندی*")]
        [DisplayName("دسته بندی*")]
        [Required(ErrorMessage = "دسته بندی کتاب را انتخاب کنید.")]
        public string Category { get; set; }

        [Display(Name = "قیمت*")]
        [DisplayName("قیمت*")]
        [Required(ErrorMessage = "قیمت کتاب را وارد کنید.")]
        public int Price { get; set; }
    }
}
