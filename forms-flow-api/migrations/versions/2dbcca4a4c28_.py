"""Form title length updated

Revision ID: 2dbcca4a4c28
Revises: 960477800395
Create Date: 2024-12-02 11:50:19.461596

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2dbcca4a4c28'
down_revision = '960477800395'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('form_process_mapper', 'form_name',
               existing_type=sa.VARCHAR(length=100),
               type_=sa.String(length=200),
               existing_nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('form_process_mapper', 'form_name',
               existing_type=sa.String(length=200),
               type_=sa.VARCHAR(length=100),
               existing_nullable=False)
    # ### end Alembic commands ###
