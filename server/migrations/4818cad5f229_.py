"""empty message

Revision ID: 4818cad5f229
Revises: a793cf8bca82
Create Date: 2023-11-06 07:13:57.240464

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4818cad5f229'
down_revision = 'a793cf8bca82'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('profile_url', sa.String(length=120), nullable=True))
        batch_op.drop_column('image_url')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image_url', sa.VARCHAR(length=120), nullable=True))
        batch_op.drop_column('profile_url')

    # ### end Alembic commands ###
