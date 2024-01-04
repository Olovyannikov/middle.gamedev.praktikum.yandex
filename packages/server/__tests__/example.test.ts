const magic = '🪄';

const cast = (spell: string, item: string) => {
    if (spell.startsWith(magic)) {
        return '🐷';
    }

    return item;
};

describe('test', () => {
    it('spell casting', () => {
        const result = cast(magic, '🐸');
        expect(result).toBe('🐷');
    });
});
