using chessAPI.dataAccess.models;
using chessAPI.models.piece;
using MongoDB.Bson;
using MongoDB.Driver;

namespace chessAPI.dataAccess.repositores;

public sealed class clsPieceRepository : IPieceRepository
{
    private readonly IMongoCollection<clsPieceEntityModel> pieceCollection;

    public clsPieceRepository(IMongoCollection<clsPieceEntityModel> pieceCollection)
    {
        this.pieceCollection = pieceCollection;
    }

    private async Task<long> getLastGame()
    {
        //Empty document tells the driver to count all the documents in the collection
        return await pieceCollection.CountDocumentsAsync(new BsonDocument());
    }

    public async Task addPiece(clsNewPiece newPiece)
    {
        var newId = await getLastGame().ConfigureAwait(false) + 1;
        await pieceCollection.InsertOneAsync(new clsPieceEntityModel(newPiece, newId)).ConfigureAwait(false);
    }
}
