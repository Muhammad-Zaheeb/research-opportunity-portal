from fastapi import APIRouter, HTTPException, status

from backend.app.models import (
    create_opportunity,
    get_all_opportunities,
    get_opportunity,
    update_opportunity,
    delete_opportunity
)
from backend.app.schemas import OpportunityCreate, OpportunityUpdate


router = APIRouter(prefix="/api/opportunities", tags=["Research Opportunities"])


def validate_status(value):
    if value not in ["Open", "Closed"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Status must be Open or Closed"
        )


@router.post("", status_code=status.HTTP_201_CREATED)
def create(data: OpportunityCreate):
    validate_status(data.status)

    try:
        opportunity_id = create_opportunity(data.model_dump())
        opportunity = get_opportunity(opportunity_id)

        return opportunity

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create research opportunity"
        )


@router.get("")
def get_all():
    try:
        return get_all_opportunities()

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve research opportunities"
        )


@router.get("/{opportunity_id}")
def get_one(opportunity_id: int):
    try:
        opportunity = get_opportunity(opportunity_id)

        if not opportunity:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Research opportunity not found"
            )

        return opportunity

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve research opportunity"
        )


@router.put("/{opportunity_id}")
def update(opportunity_id: int, data: OpportunityUpdate):
    update_data = data.model_dump(exclude_unset=True)

    if "status" in update_data:
        validate_status(update_data["status"])

    try:
        if not get_opportunity(opportunity_id):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Research opportunity not found"
            )

        if not update_data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No data provided for update"
            )

        update_opportunity(opportunity_id, update_data)

        return get_opportunity(opportunity_id)

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update research opportunity"
        )


@router.delete("/{opportunity_id}")
def delete(opportunity_id: int):
    try:
        if not get_opportunity(opportunity_id):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Research opportunity not found"
            )

        delete_opportunity(opportunity_id)

        return {"message": "Research opportunity deleted successfully"}

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete research opportunity"
        )