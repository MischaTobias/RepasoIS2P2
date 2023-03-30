using chessAPI.dataAccess.repositores;
using chessAPI.business.interfaces;
using chessAPI.models.piece;

namespace chessAPI.business.impl;

public sealed class clsPieceBusiness : IPieceBusiness
{
    internal readonly IPieceRepository pieceRepository;

    public clsPieceBusiness(IPieceRepository pieceRepository) => this.pieceRepository = pieceRepository;

    public async Task createPiece(clsNewPiece newPiece) => await pieceRepository.addPiece(newPiece).ConfigureAwait(false);
}
