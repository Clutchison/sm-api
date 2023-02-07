/**
 * Tests Alignment.enum.ts
 * 
 * @group unit/blocks/alignment
 */
import { parseAlignment } from '../alignment.enum'


describe('parseAlignment', () => {

  it('should return correct alignments when passed appropriate inputs', () => {
    const lawfulGood = parseAlignment('lawful', 'good');
    const lawfulNeutral = parseAlignment('lawful', 'neutral');
    const lawfulEvil = parseAlignment('lawful', 'evil');
    const neutralGood = parseAlignment('neutral', 'good');
    const trueNeutral = parseAlignment('neutral', 'neutral');
    const neutralEvil = parseAlignment('neutral', 'evil');
    const chaoticGood = parseAlignment('chaotic', 'good');
    const chaoticNeutral = parseAlignment('chaotic', 'neutral');
    const chaoticEvil = parseAlignment('chaotic', 'evil');

    expect(lawfulGood).toEqual('lawful good');
    expect(lawfulNeutral).toEqual('lawful neutral');
    expect(lawfulEvil).toEqual('lawful evil');
    expect(neutralGood).toEqual('neutral good');
    expect(trueNeutral).toEqual('true neutral');
    expect(neutralEvil).toEqual('neutral evil');
    expect(chaoticGood).toEqual('chaotic good');
    expect(chaoticNeutral).toEqual('chaotic neutral');
    expect(chaoticEvil).toEqual('chaotic evil');
  });
})