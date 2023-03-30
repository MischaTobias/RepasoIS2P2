
using chessAPI.models.piece;

namespace chessAPI.business.interfaces;

public interface IPieceBusiness
{
    Task createPiece(clsNewPiece newPiece);
}