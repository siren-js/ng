import { Field } from '@siren-js/core';
import { fieldToFormControl } from './form-control.util';

describe('fieldToFormControl()', () => {
  describe('text-based fields', () => {
    const fields = [
      new Field('fullName', { type: 'text', value: 'Harry Potter' }),
      new Field('quest', { type: 'search', value: 'destroy the horcruxes' }),
      new Field('phone', { type: 'tel', value: '+44 7700 900077' }),
      new Field('website', {
        type: 'url',
        value: 'https://harrypotter.fandom.com/wiki/Harry_Potter'
      }),
      new Field('email', { type: 'email', value: 'harry@potter.uk' }),
      new Field('password', { type: 'password', value: 'v0ldemort$tinks' }),
      new Field('birthDate', { type: 'date', value: '1980-07-31' }),
      new Field('birthMonth', { type: 'week', value: '1980-07' }),
      new Field('birthWeek', { type: 'week', value: '1980-W31' }),
      new Field('birthTime', { type: 'time', value: '12:34:56.789' }),
      new Field('birthDateTime', {
        type: 'datetime-local',
        value: '1980-07-31T12:34:56.789'
      }),
      new Field('age', { type: 'number', value: 40 }),
      new Field('favoriteNumber', { type: 'range', value: 69 }),
      new Field('favoriteColor', { type: 'color', value: '#740001' }),
      new Field('bio', { type: 'textarea', value: 'foo bar baz' })
    ];

    it('should use value property as state', () => {
      for (const field of fields) {
        const control = fieldToFormControl(field);
        expect(control.value).toBe(field.value);
      }
    });

    it('should update value property on value change', () => {
      for (const field of fields) {
        const control = fieldToFormControl(field);
        control.setValue('foo');
        expect(field.value).toBe('foo');
      }
    });

    it('should default state to the empty string', () => {
      const field = new Field('foo');

      const control = fieldToFormControl(field);

      expect(control.value).toBe('');
    });
  });

  describe('checkbox fields', () => {
    const fields = [
      new Field('wizard', { type: 'checkbox' }),
      new Field('witch', { type: 'checkbox', checked: true })
    ];

    it('should use checkedness as state', () => {
      expect(fieldToFormControl(fields[0]).value).toBe(false);
      expect(fieldToFormControl(fields[1]).value).toBe(true);
    });

    it('should update checkedness on value change', () => {
      const field = new Field('wizard', { type: 'checkbox' });
      const control = fieldToFormControl(field);

      control.setValue(true);
      expect(field.checked).toBe(true);

      control.setValue(false);
      expect(field.checked).toBe(false);
    });

    it('should add validator if required', () => {
      const field = new Field('wizard', { type: 'checkbox', required: true });

      const control = fieldToFormControl(field);

      expect(control.valid).toBe(false);
      control.setValue(true);
      expect(control.valid).toBe(true);
    });

    it('should not add validator if disabled', () => {
      const field = new Field('wizard', {
        type: 'checkbox',
        required: true,
        disabled: true
      });

      const control = fieldToFormControl(field);

      expect(control.disabled).toBe(true);
      expect(control.valid).toBe(false);
    });
  });

  describe('radio fields', () => {
    it('should use checked button index as state', () => {
      const field = new Field('hogwartsHouse', {
        type: 'radio',
        group: [
          { title: 'Gryffindor', value: 'gryffindor', checked: true },
          { title: 'Hufflepuff', value: 'hufflepuff' },
          { title: 'Ravenclaw', value: 'ravenclaw' },
          { title: 'Slytherin', value: 'slytherin' }
        ]
      });

      const control = fieldToFormControl(field);

      expect(control.value).toBe(0);
    });

    it('should have -1 state when nothing is checked', () => {
      const field = new Field('hogwartsHouse', {
        type: 'radio',
        group: [
          { title: 'Gryffindor', value: 'gryffindor' },
          { title: 'Hufflepuff', value: 'hufflepuff' },
          { title: 'Ravenclaw', value: 'ravenclaw' },
          { title: 'Slytherin', value: 'slytherin' }
        ]
      });

      const control = fieldToFormControl(field);

      expect(control.value).toBe(-1);
    });

    it('should update checkedness on value change ', () => {
      const buttons = [
        { title: 'Gryffindor', value: 'gryffindor', checked: true },
        { title: 'Hufflepuff', value: 'hufflepuff' },
        { title: 'Ravenclaw', value: 'ravenclaw' },
        { title: 'Slytherin', value: 'slytherin' }
      ];
      const field = new Field('hogwartsHouse', {
        type: 'radio',
        group: buttons
      });
      const control = fieldToFormControl(field);

      control.setValue(1);
      expect(control.value).toBe(1);
      expect(buttons[0].checked).toBe(false);
      expect(buttons[1].checked).toBe(true);
      expect(buttons[2].checked).toBe(false);
      expect(buttons[3].checked).toBe(false);

      control.setValue(2);
      expect(control.value).toBe(2);
      expect(buttons[0].checked).toBe(false);
      expect(buttons[1].checked).toBe(false);
      expect(buttons[2].checked).toBe(true);
      expect(buttons[3].checked).toBe(false);

      control.setValue(3);
      expect(control.value).toBe(3);
      expect(buttons[0].checked).toBe(false);
      expect(buttons[1].checked).toBe(false);
      expect(buttons[2].checked).toBe(false);
      expect(buttons[3].checked).toBe(true);
    });

    it('should ignore invalid radio field extension', () => {
      const field = new Field('hogwartsHouse', {
        type: 'radio',
        group: {}
      });

      const control = fieldToFormControl(field);

      expect(control.value).toBe(-1);
      control.setValue(0);
      expect(control.value).toBe(0);
      expect(field.group).toEqual({});
    });
  });

  describe('select fields', () => {
    describe('single value', () => {
      it('should use selected option index as state', () => {
        const field = new Field('bloodStatus', {
          type: 'select',
          options: [
            { title: 'Muggle-born', value: 'muggle-born' },
            { title: 'Half-blood', value: 'half-blood', selected: true },
            { title: 'Pure-blood', value: 'pure-blood' },
            { title: 'Squib', value: 'squib' },
            { title: 'Half-breed', value: 'half-breed' }
          ]
        });

        const control = fieldToFormControl(field);

        expect(control.value).toBe(1);
      });

      it('should have 0 state when nothing is selected', () => {
        const field = new Field('bloodStatus', {
          type: 'select',
          options: [
            { title: 'Muggle-born', value: 'muggle-born' },
            { title: 'Half-blood', value: 'half-blood' },
            { title: 'Pure-blood', value: 'pure-blood' },
            { title: 'Squib', value: 'squib' },
            { title: 'Half-breed', value: 'half-breed' }
          ]
        });

        const control = fieldToFormControl(field);

        expect(control.value).toBe(0);
      });

      it('should update options on value change ', () => {
        const options = [
          { title: 'Muggle-born', value: 'muggle-born', selected: true },
          { title: 'Half-blood', value: 'half-blood' },
          { title: 'Pure-blood', value: 'pure-blood' },
          { title: 'Squib', value: 'squib' },
          { title: 'Half-breed', value: 'half-breed' }
        ];
        const field = new Field('bloodStatus', { type: 'select', options });
        const control = fieldToFormControl(field);

        control.setValue('1');
        expect(options[0].selected).toBe(false);
        expect(options[1].selected).toBe(true);
        expect(options[2].selected).toBe(false);
        expect(options[3].selected).toBe(false);
        expect(options[4].selected).toBe(false);

        control.setValue('3');
        expect(options[0].selected).toBe(false);
        expect(options[1].selected).toBe(false);
        expect(options[2].selected).toBe(false);
        expect(options[3].selected).toBe(true);
        expect(options[4].selected).toBe(false);
      });
    });

    describe('multiple value', () => {
      it('should use selected option indices as state', () => {
        const field = new Field('bloodStatus', {
          type: 'select',
          multiple: true,
          options: [
            { title: 'Muggle-born', value: 'muggle-born' },
            { title: 'Half-blood', value: 'half-blood', selected: true },
            { title: 'Pure-blood', value: 'pure-blood' },
            { title: 'Squib', value: 'squib' },
            { title: 'Half-breed', value: 'half-breed', selected: true }
          ]
        });

        const control = fieldToFormControl(field);

        expect(control.value).toEqual([1, 4]);
      });

      it('should have empty array state when nothing is selected', () => {
        const field = new Field('bloodStatus', {
          type: 'select',
          multiple: true,
          options: [
            { title: 'Muggle-born', value: 'muggle-born' },
            { title: 'Half-blood', value: 'half-blood' },
            { title: 'Pure-blood', value: 'pure-blood' },
            { title: 'Squib', value: 'squib' },
            { title: 'Half-breed', value: 'half-breed' }
          ]
        });

        const control = fieldToFormControl(field);

        expect(control.value).toEqual([]);
      });

      it('should update options on value change ', () => {
        const options = [
          { title: 'Muggle-born', value: 'muggle-born', selected: true },
          { title: 'Half-blood', value: 'half-blood' },
          { title: 'Pure-blood', value: 'pure-blood' },
          { title: 'Squib', value: 'squib' },
          { title: 'Half-breed', value: 'half-breed' }
        ];
        const field = new Field('bloodStatus', {
          type: 'select',
          multiple: true,
          options
        });
        const control = fieldToFormControl(field);

        control.setValue([1]);
        expect(options[0].selected).toBe(false);
        expect(options[1].selected).toBe(true);
        expect(options[2].selected).toBe(false);
        expect(options[3].selected).toBe(false);
        expect(options[4].selected).toBe(false);

        control.setValue([1, 2]);
        expect(options[0].selected).toBe(false);
        expect(options[1].selected).toBe(true);
        expect(options[2].selected).toBe(true);
        expect(options[3].selected).toBe(false);
        expect(options[4].selected).toBe(false);

        control.setValue([0, 2, 4]);
        expect(options[0].selected).toBe(true);
        expect(options[1].selected).toBe(false);
        expect(options[2].selected).toBe(true);
        expect(options[3].selected).toBe(false);
        expect(options[4].selected).toBe(true);
      });
    });

    it('should ignore invalid select field extension', () => {
      const field = new Field('hogwartsHouse', {
        type: 'select',
        options: {}
      });

      const control = fieldToFormControl(field);

      expect(control.value).toBe(0);
      control.setValue(1);
      expect(control.value).toBe(1);
      expect(field.options).toEqual({});
    });
  });
});
