import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';

import { FirebaseService } from './firebase.service';

describe('FirebaseService', () => {
  let service: FirebaseService;

  const refSpy = jasmine.createSpyObj('ref', ['get']);
  const docSpy = jasmine.createSpyObj('doc', null, {ref: refSpy});
  const collectionSpy = jasmine.createSpyObj('collection', {add: 'add', doc: docSpy});
  const firestoreSpy = jasmine.createSpyObj('firestore', {collection: collectionSpy});

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: AngularFirestore, useValue: firestoreSpy}]
    });
    service = TestBed.inject(FirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addShoppingList Method', () => {
    const mockList = {name: 'test', savedItems: [], league: 'ritual'};

    beforeEach(() => {
      service.addShoppingList(mockList);
    })

    it('should use collection "shoppinglists"', () => {
      expect(firestoreSpy.collection).toHaveBeenCalledWith('shoppinglists');
    });

    it('should add correct data', () => {
      expect(collectionSpy.add).toHaveBeenCalledWith(mockList);
    });
  });

  describe('getShoppingList Method', () => {
    const mockID = 'mock-id';

    beforeEach(() => {
      service.getShoppingList(mockID);
    })

    it('should call doc with "mock-id"', () => {
      expect(collectionSpy.doc).toHaveBeenCalledWith(mockID);
    });

    it('should have called get from ref', () => {
      expect(refSpy.get).toHaveBeenCalled();
    });
  });
});
