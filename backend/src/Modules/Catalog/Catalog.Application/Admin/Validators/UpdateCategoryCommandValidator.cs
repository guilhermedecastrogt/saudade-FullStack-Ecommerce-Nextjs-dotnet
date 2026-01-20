using FluentValidation;

namespace Catalog.Application.Admin.Commands;

public sealed class UpdateCategoryCommandValidator : AbstractValidator<UpdateCategoryCommand>
{
    public UpdateCategoryCommandValidator()
    {
        RuleFor(x => x.CategoryId).NotEmpty();
        RuleFor(x => x.Slug).NotEmpty();
        RuleFor(x => x.Name).NotEmpty();
    }
}
