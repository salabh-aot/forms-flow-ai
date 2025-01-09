"""Added index for tenant columns and parent_process_key column in process table

Revision ID: 532c891250d6
Revises: 6fc8e5beebe4
Create Date: 2025-01-09 10:23:24.969716

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '532c891250d6'
down_revision = '6fc8e5beebe4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_index(op.f('ix_authorization_tenant'), 'authorization', ['tenant'], unique=False)
    op.create_index(op.f('ix_form_process_mapper_tenant'), 'form_process_mapper', ['tenant'], unique=False)
    op.create_index(op.f('ix_process_parent_process_key'), 'process', ['parent_process_key'], unique=False)
    op.create_index(op.f('ix_process_tenant'), 'process', ['tenant'], unique=False)
    op.create_index(op.f('ix_themes_tenant'), 'themes', ['tenant'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_themes_tenant'), table_name='themes')
    op.drop_index(op.f('ix_process_tenant'), table_name='process')
    op.drop_index(op.f('ix_process_parent_process_key'), table_name='process')
    op.drop_index(op.f('ix_form_process_mapper_tenant'), table_name='form_process_mapper')
    op.drop_index(op.f('ix_authorization_tenant'), table_name='authorization')
    # ### end Alembic commands ###
