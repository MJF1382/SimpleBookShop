namespace SimpleBookShop.Helpers.Extensions
{
    public static class StringExtensions
    {
        public static bool HasValue(this string input)
        {
            try
            {
                if (string.IsNullOrEmpty(input) || string.IsNullOrWhiteSpace(input))
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        public static string ToPersianNumber(this string input)
        {
            try
            {
                string newString = "";

                newString = input
                    .Replace("0", "۰")
                    .Replace("1", "۱")
                    .Replace("2", "۲")
                    .Replace("3", "۳")
                    .Replace("4", "۴")
                    .Replace("5", "۵")
                    .Replace("6", "۶")
                    .Replace("7", "۷")
                    .Replace("8", "۸")
                    .Replace("9", "۹");

                return newString;
            }
            catch
            {
                return null;
            }
        }

        public static string ToEnglishNumber(this string input)
        {
            try
            {
                string newString = "";

                newString = input
                    .Replace("۰", "0")
                    .Replace("۱", "1")
                    .Replace("۲", "2")
                    .Replace("۳", "3")
                    .Replace("۴", "4")
                    .Replace("۵", "5")
                    .Replace("۶", "6")
                    .Replace("۷", "7")
                    .Replace("۸", "8")
                    .Replace("۹", "9");

                return newString;
            }
            catch
            {
                return null;
            }
        }
    }
}
