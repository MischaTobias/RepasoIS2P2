using chessAPI.models.piece;

namespace chessAPI.dataAccess.repositores;

public interface IPieceRepository
{
    Task addPiece(clsNewPiece newPiece);
}
