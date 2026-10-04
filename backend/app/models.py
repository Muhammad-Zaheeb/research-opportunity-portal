from backend.app.database import get_connection


def create_opportunity(data):
    connection = get_connection()
    cursor = connection.cursor()

    query = """
        INSERT INTO research_opportunities
        (title, description, research_area, faculty_name, department,
         required_skills, available_positions, application_deadline, status)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    values = (
        data["title"],
        data["description"],
        data["research_area"],
        data["faculty_name"],
        data["department"],
        data["required_skills"],
        data["available_positions"],
        data["application_deadline"],
        data.get("status", "Open")
    )

    cursor.execute(query, values)
    connection.commit()

    opportunity_id = cursor.lastrowid

    cursor.close()
    connection.close()

    return opportunity_id


def get_all_opportunities():
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM research_opportunities ORDER BY id")
    opportunities = cursor.fetchall()

    cursor.close()
    connection.close()

    return opportunities


def get_opportunity(opportunity_id):
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM research_opportunities WHERE id = %s",
        (opportunity_id,)
    )

    opportunity = cursor.fetchone()

    cursor.close()
    connection.close()

    return opportunity


def update_opportunity(opportunity_id, data):
    connection = get_connection()
    cursor = connection.cursor()

    fields = []
    values = []

    for field, value in data.items():
        fields.append(f"{field} = %s")
        values.append(value)

    if not fields:
        cursor.close()
        connection.close()
        return False

    values.append(opportunity_id)

    query = f"""
        UPDATE research_opportunities
        SET {", ".join(fields)}
        WHERE id = %s
    """

    cursor.execute(query, values)
    connection.commit()

    updated = cursor.rowcount > 0

    cursor.close()
    connection.close()

    return updated


def delete_opportunity(opportunity_id):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "DELETE FROM research_opportunities WHERE id = %s",
        (opportunity_id,)
    )

    connection.commit()

    deleted = cursor.rowcount > 0

    cursor.close()
    connection.close()

    return deleted