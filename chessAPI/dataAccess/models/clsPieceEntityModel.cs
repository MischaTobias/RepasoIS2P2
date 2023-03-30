namespace chessAPI.dataAccess.models;

using chessAPI.models.piece;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public sealed class clsPieceEntityModel
{
    public clsPieceEntityModel()
    {
    }

    public clsPieceEntityModel(clsNewPiece newPiece, long id)
    {
        this.name = newPiece.name;
        this.id = id;
    }

    public ObjectId Id { get; set; }

    [BsonElement("id_piece")]
    public long id { get; set; }
    public string name { get; set; } = default!;
    public static explicit operator clsPiece(clsPieceEntityModel x)
    {
        return new clsPiece()
        {
            id = x.id,
            name = x.name
        };
    }
}