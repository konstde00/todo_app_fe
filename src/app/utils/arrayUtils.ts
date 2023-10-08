import { equals } from 'rambda';
import { ESortDirection } from './arrayUtils.enums';
import _orderBy from 'lodash-es/orderBy';
import _uniqWith from 'lodash-es/uniqWith';
import _isEqual from 'lodash-es/isEqual';
import _intersectionWith from 'lodash-es/intersectionWith';
import _groupBy from 'lodash-es/groupBy';

type PropName<T, K extends keyof T> = ((obj: T) => T[K]) | K;

export class ArrayUtils {

  static find<T>(array: Array<T>,
                predicate: (elem: T, index: number, arr: Array<T>) => boolean,
                predicateThisArg?: any): T | undefined {

    var length = array.length;
    var elem;
    for (var i = 0; i < length; i++) {
      elem = array[i];
      if (predicate.call(predicateThisArg, elem, i, array)) {
        return elem;
      }
    }
    return undefined;
  }

  static findIndex<T>(array: Array<T>,
                  predicate: (elem: T, index: number, arr: Array<T>) => boolean,
                  predicateThisArg?: any): number {

    const length = array.length;
    for (let i = 0; i < length; i++) {
      if (predicate.call(predicateThisArg, array[i], i, array)) {
        return i;
      }
    }
    return -1;
  }

  static areEquals<T>(arr1: T[] = [], arr2: T[] = []): boolean {
    return equals(arr1, arr2);
  }

  static areEqualsByProp<T>(arr1: T[] = [], arr2: T[] = [], compareObjProp: string = 'id'): boolean {
    // @ts-ignore
    const arr1Props = arr1.map(i => i[compareObjProp]);
    // @ts-ignore
    const arr2Props = arr2.map(i => i[compareObjProp]);
    return equals(arr1Props, arr2Props);
  }

  static flatten<T>(arr: Array<T|T[]>): T[] {
    if (!Array.isArray(arr)) return [];
    return arr.reduce((acc, item) => (acc as T[]).concat(item), []) as T[];
  }

  /**
   * Converts array to map, where key is object's property name and value - object
   */
  static toMap<T, K extends keyof T>(arr: T[], propName: K): Map<T[K], T> {
    if (!Array.isArray(arr)) return new Map();
    return arr.reduce(
      (map, d) => map.set(d[propName], d),
      new Map()
    );
  }

  /**
   * Groups items by property in the following form:
   * [GroupByPropValue, Items[]] []
   */
  static groupByAsArray<T, K extends keyof T>(arr: T[], propName: K): [T[K], T[]] [] {
    if (!Array.isArray(arr)) return [];
    const map = arr.reduce((map: Map<T[K], T[]>, item: T) => {
      const propValue = item[propName];
      const arr = (map.get(propValue) || []).concat(item);
      return map.set(propValue, arr);
    }, new Map());
    return Array.from(map);
  }

  static groupByAsObject<T, K extends keyof T>(arr: T[], prop: PropName<T, K>): { [index: string]: T[] }  {
    return _groupBy(arr, prop);
  }

  static removeDuplicates<T>(array: T[],
                             comparator?: (item1: T, item2: T) => boolean): T[] {
    return _uniqWith(array, comparator || _isEqual);
  }

  static sortBy<T, K extends keyof T>(array: T[],
                                      props: PropName<T, K>[] | PropName<T, K>,
                                      orders: ESortDirection.asc | ESortDirection.desc | Array<ESortDirection.asc | ESortDirection.desc> = ESortDirection.asc): T[] {
    return _orderBy(array, props, orders);
  }

  static intersectionWith<T, U>(array1: T[],
                                array2: U[],
                                comparator: (item1: T, item2: U) => boolean): T[] {
    return _intersectionWith(array1, array2, comparator);
  }

  static diff<T, U>(array1: T[],
                    array2: U[],
                    areEqual: (item1: T, item2: U) => boolean): {
    added: U[];
    same: {
      array1: T[],
      array2: U[]
    };
    removed: T[];
  } {
    const added: U[] = [];
    const sameA2: U[] = [];
    array2.forEach(i2 => {
      if (!array1.find(i1 => areEqual(i1, i2))) {
        added.push(i2);
      } else {
        sameA2.push(i2);
      }
    });
    const removed: T[] = [];
    const sameA1: T[] = [];
    array1.forEach(i1 => {
      if (!array2.find(i2 => areEqual(i1, i2))) {
        removed.push(i1);
      } else {
        sameA1.push(i1);
      }
    });
    return {
      added,
      removed,
      same: {
        array1: sameA1,
        array2: sameA2
      }
    };
  }
}
