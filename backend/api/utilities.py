def choicesTuplesToChoices(choices):
    """Convert an array of Choice tuples to an array of Choice names"""
    return [choice[0] for choice in choices]


def is_admin(user):
    return user.groups.filter(name="admin").exists()
