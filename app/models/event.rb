class Event < ApplicationRecord
  def generate_scramble
    {
      "2x2": Scrambler::TwoByTwo.new.scramble,
      "3x3": Scrambler::ThreeByThree.new.scramble,
      "4x4": Scrambler::FourByFour.new.scramble,
      "5x5": Scrambler::FiveByFive.new.scramble,
      "6x6": Scrambler::SixBySix.new.scramble,
      "7x7": Scrambler::SevenBySeven.new.scramble,
      megaminx: Scrambler::Megaminx.new.scramble,
      pyraminx: Scrambler::Pyraminx.new.scramble,
      "square-1": Scrambler::Square1.new.scramble
    }.fetch(name.to_sym)
  end
end
