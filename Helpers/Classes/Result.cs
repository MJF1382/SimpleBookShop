using SimpleBookShop.Helpers.Enums;

namespace SimpleBookShop.Helpers.Classes
{
    public class Result
    {
        public ResultType Status { get; set; }
        public object? Content { get; set; }
        public string? ErrorText { get; set; }

        public Result(ResultType status, object content, string errorText)
        {
            Status = status;
            Content = content;
            ErrorText = errorText;
        }

        public Result(ResultType status, string errorText)
        {
            Status = status;
            ErrorText = errorText;
        }

        public Result(ResultType status)
        {
            Status = status;
        }
    }
}
