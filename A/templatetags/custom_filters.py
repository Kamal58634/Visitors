
from django import template

register = template.Library()

@register.filter
def remove_colon(label_tag):
    # Assuming label_tag is in the format: <label for="id_gate">Gate:</label>
    start_index = label_tag.find('>') + 1  # Find the closing angle bracket
    end_index = label_tag.rfind('<')  # Find the opening angle bracket

    # Extract the label text between the brackets and remove the colon
    label_text = label_tag[start_index:end_index].strip().rstrip(':')

    return label_text
