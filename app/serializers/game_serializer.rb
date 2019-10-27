class GameSerializer < ActiveModel::Serializer
  attributes :id, :status, :board
end
