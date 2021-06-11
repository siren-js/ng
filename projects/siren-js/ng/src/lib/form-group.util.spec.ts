import { Action } from '@siren-js/core';
import { actionToFormGroup } from './form-group.util';

describe('actionToFormGroup()', () => {
  it('should add controls for each field', () => {
    const action = new Action('create-account', '/accounts', {
      method: 'POST',
      fields: [
        { name: 'randomNumber', type: 'hidden', value: 69420 },
        { name: 'fullName', type: 'text', value: 'Harry Potter' },
        { name: 'quest', type: 'search', value: 'destroy the horcruxes' },
        { name: 'phone', type: 'tel', value: '+44 7700 900077' },
        {
          name: 'website',
          type: 'url',
          value: 'https://harrypotter.fandom.com/wiki/Harry_Potter',
        },
        { name: 'email', type: 'email', value: 'harry@potter.uk' },
        { name: 'password', type: 'password', value: 'v0ldemort$tinks' },
        { name: 'birthDate', type: 'date', value: '1980-07-31' },
        { name: 'birthMonth', type: 'week', value: '1980-07' },
        { name: 'birthWeek', type: 'week', value: '1980-W31' },
        { name: 'birthTime', type: 'time', value: '12:34:56.789' },
        {
          name: 'birthDateTime',
          type: 'datetime-local',
          value: '1980-07-31T12:34:56.789',
        },
        { name: 'age', type: 'number', value: 40 },
        { name: 'favoriteNumber', type: 'range', value: 69 },
        { name: 'favoriteColor', type: 'color', value: '#740001' },
        { name: 'wizard', type: 'checkbox', value: 'yes', checked: true },
        {
          name: 'hogwartsHouse',
          type: 'radio',
          group: [
            { title: 'Gryffindor', value: 'gryffindor', checked: true },
            { title: 'Hufflepuff', value: 'hufflepuff' },
            { title: 'Ravenclaw', value: 'ravenclaw' },
            { title: 'Slytherin', value: 'slytherin' },
          ],
        },
        {
          name: 'bloodStatus',
          type: 'select',
          options: [
            { title: 'Muggle-born', value: 'muggle-born' },
            { title: 'Half-blood', value: 'half-blood', selected: true },
            { title: 'Pure-blood', value: 'pure-blood' },
            { title: 'Squib', value: 'squib' },
            { title: 'Half-breed', value: 'half-breed' },
          ],
        },
        { name: 'bio', type: 'textarea', value: 'The boy who lived.' },
        {
          name: 'avatar',
          type: 'file',
          files: [new File(['🤓'], 'avatar.png', { type: 'image/png' })],
        },
      ],
    });

    const { controls } = actionToFormGroup(action);

    // tslint:disable-next-line:no-non-null-assertion
    for (const { name } of action.fields!) {
      expect(controls[name]).toBeDefined();
    }
  });

  it('should create empty form group from action with no fields', () => {
    const action = new Action('foo', '/foo');

    const formGroup = actionToFormGroup(action);

    expect(formGroup.controls).toEqual({});
  });
});
